// export const URL = `http://localhost:8080/api`;
export const URL = "https://spotlight-backend-n9cj.onrender.com/api";

export const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };