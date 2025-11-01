import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blog";
import { Link } from "react-router-dom";
import { getAllUsers } from "../services/users";

const UsersPage = () => {
  const {
    data: allUsers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Oops...Error Occured</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold font-mono my-4">List of Users</h2>

      <table className="table border mx-auto">
        <thead>
          <tr className="bg-blue-200">
            <th className="border p-4 min-w-md">Author</th>
            <th className="border p-4 min-w-md">Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {allUsers &&
            allUsers.map((user) => {
              return (
                <tr key={user.id} className="border">
                  <td className="border p-2">
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length > 0 ? user.blogs.length : 0}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
