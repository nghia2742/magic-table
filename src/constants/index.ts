export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  gender: string;
};

export const DUMMY_DATA: Person[] = [
  {
    firstName: 'Tanner',
    lastName: 'Smith',
    age: 24,
    email: 'tanner@gmail.com',
    gender: 'Other',
  },
  {
    firstName: 'Nancy',
    lastName: 'Miller',
    age: 40,
    email: 'nancy@gmail.com',
    gender: 'Female',
  },
  {
    firstName: 'Joe',
    lastName: 'Cook',
    age: 45,
    email: 'joe@gmail.com',
    gender: 'Male',
  },
]