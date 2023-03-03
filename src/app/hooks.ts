import { rootState, appDispatch } from './store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector;
export const useAppDispatch = () => useDispatch<appDispatch>();
