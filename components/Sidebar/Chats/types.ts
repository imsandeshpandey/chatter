type User = {
  name: string;
  age: number;
  email: string;
};

type Admin = User & {
  id?: number;
};

type Prettify<T> = {
  [K in keyof T]: T[K];
};

type Prettified = Prettify<Admin>;

type Ugly = Admin;
