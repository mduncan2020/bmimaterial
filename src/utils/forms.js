
export const required = value => value ? undefined : 'Required'

export const validateEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address' : undefined

export const validateNumber = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined

export const minValue1 = minValue(1)

export const calculateBmi = (weight, height, isMetric) => {
  var bmi = weight / (height * height)
  if (!isMetric) {
    bmi = bmi * 703
  }

  return bmi.toFixed(1)
}
