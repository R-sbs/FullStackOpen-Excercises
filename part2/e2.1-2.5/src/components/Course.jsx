import React from 'react'

const Course = ({ courses }) => {
    return (
      <>
        {courses.map((course) => (
          <div key={course.name}>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        ))}
      </>
    );
  };

export default Course;


// Sub-Components
  const Header = ({ title }) => {
    return (
      <>
        <h1>{title}</h1>
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
    const total = parts.reduce((accumulator, currentPart) => {
      return accumulator + currentPart.exercises;
    }, 0);
  
    return (
      <>
        <p style={{ fontWeight: '600'}}>Total of {total} exercises.</p>
      </>
    );
  };
  