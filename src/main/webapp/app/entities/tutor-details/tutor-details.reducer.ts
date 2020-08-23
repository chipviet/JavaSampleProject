import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITutorDetails, defaultValue } from 'app/shared/model/tutor-details.model';

export const ACTION_TYPES = {
  FETCH_TUTORDETAILS_LIST: 'tutorDetails/FETCH_TUTORDETAILS_LIST',
  FETCH_TUTORDETAILS: 'tutorDetails/FETCH_TUTORDETAILS',
  CREATE_TUTORDETAILS: 'tutorDetails/CREATE_TUTORDETAILS',
  UPDATE_TUTORDETAILS: 'tutorDetails/UPDATE_TUTORDETAILS',
  DELETE_TUTORDETAILS: 'tutorDetails/DELETE_TUTORDETAILS',
  RESET: 'tutorDetails/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITutorDetails>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TutorDetailsState = Readonly<typeof initialState>;

// Reducer

export default (state: TutorDetailsState = initialState, action): TutorDetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TUTORDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TUTORDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TUTORDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_TUTORDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_TUTORDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TUTORDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TUTORDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_TUTORDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_TUTORDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_TUTORDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TUTORDETAILS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TUTORDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TUTORDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_TUTORDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TUTORDETAILS):
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

const apiUrl = 'api/tutor-details';

// Actions

export const getEntities: ICrudGetAllAction<ITutorDetails> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TUTORDETAILS_LIST,
  payload: axios.get<ITutorDetails>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITutorDetails> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TUTORDETAILS,
    payload: axios.get<ITutorDetails>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITutorDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TUTORDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITutorDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TUTORDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITutorDetails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TUTORDETAILS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
