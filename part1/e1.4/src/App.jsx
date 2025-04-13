
const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

export default App;

const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <div key={part.name}>
          <Part part={part} />
        </div>
      ))}
    </>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} : {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const [part1, part2, part3] = parts;
  return (
    <>
      <p>
        Number of exercises :{" "}
        {part1.exercises + part2.exercises + part3.exercises}
      </p>
    </>
  );
};

