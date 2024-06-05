import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { PropertyDetails } from '../types/PropertyDetails';

interface PropertyState {
  properties: PropertyDetails[];
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  loading: false,
  error: null,
};

// Filtrare apartamente
export const fetchPageProperties = async (page: number, config: AxiosRequestConfig) => {
  const response = await axios.get('/api/sites/v1/properties', {
    ...config,
    params: { ...config.params, status: 'for_sale', page },
  });
  return response.data.data.filter(
    (property: PropertyDetails) => property.tiplocuinta === 'apartament' && property.devanzare === 1
  );
};

// Filtrare Case
export const fetchPageCases = async (page: number, config: AxiosRequestConfig): Promise<PropertyDetails[]> => {
  const response = await axios.get('/api/sites/v1/properties', {
    ...config,
    params: { ...config.params, status: 'for_sale', page },
  });
  return response.data.data.filter(
    (property: PropertyDetails) => (property.tiplocuinta === 'casa' || property.tiplocuinta === 'vila') && property.devanzare === 1
  );
};

// Asynchronous thunk action for fetching properties
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (_, { rejectWithValue }) => {
    try {
      const start = performance.now(); // Start timing

      const agentId = "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
      const agentPassword = "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
      const headers = {
        Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
      };

      const propertiesPerPage = 500;
      const config: AxiosRequestConfig = {
        headers,
        params: { per_page: propertiesPerPage },
      };

      // Fetch the total number of pages
      const { data: { last_page: totalPages } } = await axios.get('/api/sites/v1/properties', config);

      const batchSize = 10;
      const allProperties: PropertyDetails[] = [];

      for (let i = 0; i < totalPages; i += batchSize) {
        const fetchPropertiesPromises = Array.from({ length: Math.min(batchSize, totalPages - i) }, (_, j) =>
          fetchPageProperties(i + j + 1, config)
        );

        const batchProperties = await Promise.allSettled(fetchPropertiesPromises);
        batchProperties.forEach(result => {
          if (result.status === 'fulfilled') {
            allProperties.push(...result.value);
          }
        });
      }

      allProperties.sort((a, b) => b.idnum - a.idnum);

      const end = performance.now(); // End timing
      console.log(`Time taken to load properties: ${(end - start) / 1000} seconds`);

      return allProperties;
    } catch (error) {
      console.error('Error loading properties', error);
      return rejectWithValue('Error loading properties');
    }
  }
);

// Asynchronous thunk action for fetching houses
export const fetchHouses = createAsyncThunk(
  'properties/fetchHouses',
  async (_, { rejectWithValue }) => {
    try {
      const start = performance.now(); // Start timing

      const agentId = "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
      const agentPassword = "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
      const headers = {
        Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
      };

      const propertiesPerPage = 500;
      const config: AxiosRequestConfig = {
        headers,
        params: { per_page: propertiesPerPage },
      };

      // Fetch the total number of pages
      const { data: { last_page: totalPages } } = await axios.get('/api/sites/v1/properties', config);

      const batchSize = 10;
      const allHouses: PropertyDetails[] = [];


      for (let i = 0; i < totalPages; i += batchSize) {
        const fetchHousesPromises = Array.from({ length: Math.min(batchSize, totalPages - i) }, (_, j) =>
          fetchPageCases(i + j + 1, config)
        );

        const batchHouses = await Promise.allSettled(fetchHousesPromises);
        batchHouses.forEach(result => {
          if (result.status === 'fulfilled') {
            allHouses.push(...result.value);
          }
        });
      }

      allHouses.sort((a, b) => b.idnum - a.idnum);

      const end = performance.now(); // End timing
      console.log(`Time taken to load houses: ${(end - start) / 1000} seconds`);

      return allHouses;
      console.log(allHouses)
    } catch (error) {
      console.error('Error loading houses', error);
      return rejectWithValue('Error loading houses');
    }
  }
);

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchHouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default propertySlice.reducer;
