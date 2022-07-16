import Input from "./Input"
import Button from "./Button"

const NewPhoneForm = ({nameInput, phoneInput, onSubmit}) =>
    <>
        <h3>Add new phone number</h3>
        <form onSubmit={onSubmit}>
        <div>
            <Input label="name" 
                    state={nameInput.state} 
                    onStateChange={nameInput.onChange} />

            <Input label="phone" 
                    state={phoneInput.state} 
                    onStateChange={phoneInput.onChange} />
        </div>
        <Button label="add" />
        </form>
    </>

export default NewPhoneForm