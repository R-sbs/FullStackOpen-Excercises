import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    return error;
  }
};

const addBlog = async (newObj) => {
  const storedObj = localStorage.getItem("token");
  const { token } = JSON.parse(storedObj);
  try {
    const response = await axios.post(baseUrl, newObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return(error);
  }
};

const deleteBlog = async (id) => {
  const storedObj = localStorage.getItem("token");
  const { token } = JSON.parse(storedObj);

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};


export default { getAll, addBlog, deleteBlog };
