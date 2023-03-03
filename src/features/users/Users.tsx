import React, { useEffect } from 'react';
import { fetchUsersPadding } from './users.slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { rootState } from '../../app/store';
import { IUser } from './users.slice';

export const User: React.FC = () => {
  const { num } = useAppSelector((state: rootState) => state.counter);
  const {text} = useAppSelector((state:rootState) => state.text)

  const { isLoaded, users, error } = useAppSelector(
    (state: rootState) => state.users
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersPadding('https://jsonplaceholder.typicode.com/users'));
  }, []);

  const getNames = users.slice(0,num).filter((user:IUser)=>user.name.toLowerCase().includes(text.toLowerCase())).map((user: IUser, idx: number) => {
    return (
      <div key={idx} className="display-6 text-secondary">
        {user.name}
      </div>
    );
  });

  return <>{getNames}</>;
};
