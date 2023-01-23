import { createContext, FC, useContext, useMemo, useReducer } from "react";

export enum Country {
  Germany = 'germany',
  Austria = 'austria',
  Switzerland = 'switzerland',
}

export enum Pricing {
  Starter = 'starter',
  Plus = 'plus',
  Premium = 'premium'
}

type State = {
  name: string;
  email: string;
  country: Country | '';
  mood: boolean;
  pricing: Pricing | '';
  skill: number;
}

const initState: State = {
  name: '',
  email: '',
  country: '',
  mood: false,
  pricing: '',
  skill: 0,
};

type API = {
  onNameChange: (name: State['name']) => void;
  onEmailChange: (email: State['email']) => void;
  onCountryChange: (country: State['country']) => void;
  onMoodChange: (mood: State['mood']) => void;
  onPricingChange: (pricing: State['pricing']) => void;
  onSkillChange: (skill: State['skill']) => void;
}

type Context = API & State;

const PersonalDetailsContext = createContext<Context>({} as Context);

export const usePersonalDetails = () => useContext(PersonalDetailsContext);

enum ActionType {
  UpdateName = 'updateName',
  UpdateEmail = 'updateEmail',
  UpdateCountry = 'updateCountry',
  UpdateMood = 'updateMood',
  UpdatePricing = 'updatePricing',
  UpdateSkill = 'updateSkill',
}

type Action = {
  type: string;
  [key: string]: unknown;
}

type Actions =
  | { type: ActionType.UpdateName; name: State['name'] }
  | { type: ActionType.UpdateEmail; email: State['email'] }
  | { type: ActionType.UpdateCountry; country: State['country'] }
  | { type: ActionType.UpdateMood; mood: State['mood'] }
  | { type: ActionType.UpdatePricing; pricing: State['pricing'] }
  | { type: ActionType.UpdateSkill; skill: State['skill'] };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionType.UpdateName:
      return { ...state, name: action.name };
    case ActionType.UpdateEmail:
      return { ...state, email: action.email };
    case ActionType.UpdateCountry:
      return { ...state, country: action.country };
    case ActionType.UpdateMood:
      return { ...state, mood: action.mood };
    case ActionType.UpdatePricing:
      return { ...state, pricing: action.pricing };
    case ActionType.UpdateSkill:
      return { ...state, skill: action.skill };
    default:
      throw new Error(`Action of type "${(action as Action)?.type}" does not exist.`);
  }
};

export const PersonalDetailsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState as State);

  const api = useMemo(() => {
    const onNameChange = (name: State['name']) => {
      dispatch({
        type: ActionType.UpdateName,
        name,
      });
    };

    const onEmailChange = (email: State['email']) => {
      dispatch({
        type: ActionType.UpdateEmail,
        email,
      });
    };

    const onCountryChange = (country: State['country']) => {
      dispatch({
        type: ActionType.UpdateCountry,
        country,
      });
    };

    const onMoodChange = (mood: State['mood']) => {
      dispatch({
        type: ActionType.UpdateMood,
        mood,
      });
    };

    const onPricingChange = (pricing: State['pricing']) => {
      dispatch({
        type: ActionType.UpdatePricing,
        pricing,
      });
    };

    const onSkillChange = (skill: State['skill']) => {
      dispatch({
        type: ActionType.UpdateSkill,
        skill,
      });
    };

    return {
      onNameChange,
      onEmailChange,
      onCountryChange,
      onMoodChange,
      onPricingChange,
      onSkillChange,
    };

  }, []);

  return (
    <PersonalDetailsContext.Provider value={{ ...state, ...api }}>
      {children}
    </PersonalDetailsContext.Provider>
  );
};