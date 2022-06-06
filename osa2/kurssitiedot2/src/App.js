const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part part={part} key={part.id} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <p>Number of exercises: {parts.reduce((total, part) => total + part.exercises, 0)}
    </p>
  )
}

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

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
