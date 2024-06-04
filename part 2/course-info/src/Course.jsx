
export const Course = ({ course }) => {

return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <TotalOfExercises parts={course.parts} />
    </div>
)
}

const Header = ({ course }) => {
return (
    <h1>{course}</h1>
)
}

const Content = ({ parts }) => {
return (
    <>
    {parts.map(part => 
        <Part 
        key={part.id}
        part={part.name}
        exercise={part.exercises}
        />
    )}
    
    </>
)
}

const Part = ({ part, exercise }) => {
return (
    <p>
    {part} {exercise}
    </p>
)
} 

const TotalOfExercises = ({ parts }) => {
const total = parts.reduce((sum, elem) => sum + elem.exercises, 0)
return (
    <strong>Total of {total} exercises</strong>
)
}

