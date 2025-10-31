import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blog";

const UsersPage = () => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: blogService.getAll,
  });

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Oops...Error Occured</p>;
  }

  const allUsers = blogs.map((each) => each.user);
  console.log(allUsers);

  return (
    <div>
      <h2 className="text-lg font-medium">List of Users</h2>
      <ul>
        {allUsers &&
          allUsers.map((user) => {
            return <li key={user.id}>{user.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default UsersPage;
