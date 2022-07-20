import Input from "./Input"

const NewPersonForm = ({nameInput, phoneInput, onSubmit}) =>
    <>
        <h3>Add new phone number</h3>
        <form onSubmit={onSubmit}>
        <div>
            <Input label="name " 
                    state={nameInput.state} 
                    onStateChange={nameInput.onChange} />

            <Input label="phone" 
                    state={phoneInput.state} 
                    onStateChange={phoneInput.onChange} />
        </div>
        <SubmitButton />
        </form>
    </>

const SubmitButton = () =>
    <div>
        <button type="submit">add</button>
    </div>

export default NewPersonForm