import React from 'react';
import './sign-up.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert('Password and Confirm Password dont match!');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            
            const refUser = await createUserProfileDocument(user, {displayName});

            console.log(refUser);
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        } catch (error) {
            console.log('Creating user failed', error.message)
        }
    }

    handleChange = async event => {
        const { name, value } = event.target;

        this.setState({[name]: value})
    }

    render() {

        const { displayName, email, password, confirmPassword } = this.state;

        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                    name="displayName" 
                    type="displayName" 
                    value={displayName} 
                    onChange={this.handleChange} 
                    label="Display Name" 
                    required 
                    />
                    <FormInput 
                    name="email" 
                    type="email" 
                    value={email} 
                    onChange={this.handleChange} 
                    label="Email" 
                    required 
                    />
                    <FormInput 
                    name="password" 
                    type="password" 
                    value={password} 
                    onChange={this.handleChange} 
                    label="Password" 
                    required 
                    />
                    <FormInput 
                    name="confirmPassword" 
                    type="password" 
                    value={confirmPassword} 
                    onChange={this.handleChange} 
                    label="Confirm Password" 
                    required 
                    />

                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;