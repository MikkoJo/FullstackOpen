const Part = ({ part }) => {
  return (
    <p>
    {part.name} {part.exercises}
    </p>
  )
}

const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part part={part} key={part.id} />
      )}
    </div>
  )
}

const Total = ({ parts }) =>
  <p><b>
    Number of exercises: {parts.reduce((total, part) => total + part.exercises, 0)}
  </b></p>

const Course = ({ course }) => {
  // console.log(course)
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
