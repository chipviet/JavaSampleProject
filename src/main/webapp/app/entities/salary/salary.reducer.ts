import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISalary, defaultValue } from 'app/shared/model/salary.model';

export const ACTION_TYPES = {
  FETCH_SALARY_LIST: 'salary/FETCH_SALARY_LIST',
  FETCH_SALARY: 'salary/FETCH_SALARY',
  CREATE_SALARY: 'salary/CREATE_SALARY',
  UPDATE_SALARY: 'salary/UPDATE_SALARY',
  DELETE_SALARY: 'salary/DELETE_SALARY',
  RESET: 'salary/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISalary>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type SalaryState = Readonly<typeof initialState>;

// Reducer

export default (state: SalaryState = initialState, action): SalaryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SALARY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SALARY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SALARY):
    case REQUEST(ACTION_TYPES.UPDATE_SALARY):
    case REQUEST(ACTION_TYPES.DELETE_SALARY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SALARY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SALARY):
    case FAILURE(ACTION_TYPES.CREATE_SALARY):
    case FAILURE(ACTION_TYPES.UPDATE_SALARY):
    case FAILURE(ACTION_TYPES.DELETE_SALARY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALARY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALARY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SALARY):
    case SUCCESS(ACTION_TYPES.UPDATE_SALARY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SALARY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/salaries';

// Actions

export const getEntities: ICrudGetAllAction<ISalary> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SALARY_LIST,
  payload: axios.get<ISalary>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ISalary> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SALARY,
    payload: axios.get<ISalary>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISalary> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SALARY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISalary> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SALARY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISalary> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SALARY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
