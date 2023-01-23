import { FC } from "react";
import { Country, Pricing, usePersonalDetails } from "../contexts/personalDetails";

export type InputWrapperProps = {
  children: React.ReactNode;
}

export const InputWrapper: FC<InputWrapperProps> = ({ children }) => (
  <div className="input-wrapper">
    {children}
  </div>
)

export const PersonalDetailsForm: FC = () => {
  const {
    onNameChange,
    onEmailChange,
    onCountryChange,
    onMoodChange,
    onPricingChange,
    onSkillChange,
    name,
    email,
    country,
    mood,
    skill,
  } = usePersonalDetails();
  
  return (
    <form>
      <fieldset>
        <legend>Personal Details</legend>
        <div className='formRows'>
          <InputWrapper>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={({ target }) => onNameChange(target.value)}
              value={name}
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={({ target }) => onEmailChange(target.value)}
              value={email}
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="country">Country</label>
            <select
              name="country"
              id="country"
              onChange={({ target }) => onCountryChange(target.value as Country)}
              value={country}
            >
              <option value=" ">Choose country...</option>
              <option value={Country.Germany}>Germany</option>
              <option value={Country.Austria}>Austria</option>
              <option value={Country.Switzerland}>Switzerland</option>
            </select>
          </InputWrapper>
          <InputWrapper>
            <input
              type="checkbox"
              name="mood"
              id="mood"
              onChange={({ target }) => onMoodChange(target.checked)}
              checked={mood}
            />
            <label htmlFor="mood">In a good mood?</label>
          </InputWrapper>
          <InputWrapper>
            <input
              type="radio"
              name="pricing"
              id={Pricing.Starter}
              value={Pricing.Starter}
              onChange={({ target }) => onPricingChange(target.value as Pricing.Starter)}
            />
            <label htmlFor={Pricing.Starter}>Starter Package</label>
            <input
              type="radio"
              name="pricing"
              id={Pricing.Plus}
              value={Pricing.Plus}
              onChange={({ target }) => onPricingChange(target.value as Pricing.Plus)}
            />
            <label htmlFor={Pricing.Plus}>Plus Package</label>
            <input
              type="radio"
              name="pricing"
              id={Pricing.Premium}
              value={Pricing.Premium}
              onChange={({ target }) => onPricingChange(target.value as Pricing.Premium)}
            />
            <label htmlFor={Pricing.Premium}>Premium Package</label>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="skill">Skill Level</label>
            <input
              type="range"
              name="skill"
              id="skill"
              step={1}
              min={0}
              max={10}
              value={skill}
              onChange={({ target }) => onSkillChange(target.valueAsNumber)}
            />
          </InputWrapper>
          <InputWrapper>
            <button type="submit">Submit</button>
          </InputWrapper>
        </div>
      </fieldset>
    </form>
  );
};

export const PersonalDetailsCard: FC = () => {
  const {
    name,
    email,
    country,
    mood,
    pricing,
    skill,
  } = usePersonalDetails();

  return (
    <output>
      <ul>
        <li>name: {name}</li>
        <li>email: {email}</li>
        <li>country: {country}</li>
        <li>{`mood: ${mood}`}</li>
        <li>pricing: {pricing}</li>
        <li>skill: {skill}</li>
      </ul>
    </output>
  );
};

export const Hint: FC = () => (
  <div className="hint">
    <h2>React Form Context Example</h2>
    <p>This example handles a basic form which state and api is managed via a Context.</p>
    <p>
      This component does not re-render since it is not using the context hook.
      Other than lifting state up, context prevents all children of `App` to re-render on state changes.
    </p>
  </div>
);
