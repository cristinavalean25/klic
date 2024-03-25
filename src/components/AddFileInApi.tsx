import { useState } from "react";

interface ZonesType {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  imgSrc: File[];
}

function AddFileInApi() {
  const [formData, setFormData] = useState<ZonesType>({
    id: 0,
    title: "",
    shortDescription: "",
    longDescription: "",
    imgSrc: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imagesArray = Array.from(e.target.files);
      setFormData({ ...formData, imgSrc: imagesArray });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("shortDescription", formData.shortDescription);
      formDataToSend.append("longDescription", formData.longDescription);
      formData.imgSrc.forEach((image) => {
        formDataToSend.append("images[]", image);
      });

      const response = await fetch("http://192.168.1.10/zones", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        alert("Detaliile au fost adăugate cu succes la zona!");
        // Resetează formularul după trimiterea cu succes
        setFormData({
          id: 0,
          title: "",
          shortDescription: "",
          longDescription: "",
          imgSrc: [],
        });
      } else {
        const data = await response.json();
        alert(`Eroare: ${data.error}`);
      }
    } catch (error) {
      console.error("Eroare la trimiterea cererii:", error);
      alert("A apărut o eroare. Te rugăm să încerci din nou mai târziu.");
    }
  };

  return (
    <div>
      <h2>Adăugare detalii la zonă</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Titlu:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Descriere scurtă:
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Descriere lungă:
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Imagini:
          <input type="file" multiple onChange={handleImageChange} required />
        </label>
        <br />
        <button type="submit">Adaugă detalii</button>
      </form>
    </div>
  );
}

export default AddFileInApi;
