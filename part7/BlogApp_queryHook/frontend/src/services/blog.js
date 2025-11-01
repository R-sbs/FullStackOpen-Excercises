import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = async () => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

const addBlog = async (newObj) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await axios.post(baseUrl, newObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

const updateLikes = async (updatedObj, id) => {
  const { token } = JSON.parse(localStorage.getItem("user"));

  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

const deleteBlog = async (id) => {
  const { token } = JSON.parse(localStorage.getItem("user"));

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

export const getBlogById = async (id) => {
  const { token } = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await axios.get(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const addComment = async (id, comment) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user"));

    const response = await axios.post(
      `${baseUrl}/${id}/comments`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export default { getAll, addBlog, deleteBlog, updateLikes, addComment };
