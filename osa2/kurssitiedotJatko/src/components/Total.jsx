const Total = (courses) => {
    
    const total = courses.reduce((sum, course) => {
      return sum + course.parts.reduce((courseSum, part) => courseSum + part.exercises, 0)
    }, 0)
    return total
}
export default Total