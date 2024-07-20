import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import Button from './Button'; 
import { addUser } from '../api/api' // Import the addUser function

interface State {
    firstName: string;
    lastName: string;
    email: string;
    errors: {
        firstName?: string;
        lastName?: string;
        email?: string;
    };
    showSuccessCard: boolean;
    showErrorCard: boolean;
    errorMessage: string;
}

export class Exam extends React.Component<{}, State> {
    state: State = {
        firstName: "",
        lastName: "",
        email: "",
        errors: {},
        showSuccessCard: false,
        showErrorCard: false,
        errorMessage: ""
    };

    componentDidMount() {
        document.title = "Exam - My React Application";
    }

    validate = (): boolean => {
        const { firstName, lastName, email } = this.state;
        const errors: State["errors"] = {};
        let isValid = true;

        const nameRegex = /^[A-Za-z\s]+$/;

        if (!firstName.trim()) {
            errors.firstName = "First name is required";
            isValid = false;
        } else if (!nameRegex.test(firstName)) {
            errors.firstName = "First name cannot contain numbers or special characters";
            isValid = false;
        }

        if (!lastName.trim()) {
            errors.lastName = "Last name is required";
            isValid = false;
        } else if (!nameRegex.test(lastName)) {
            errors.lastName = "Last name cannot contain numbers or special characters";
            isValid = false;
        }

        if (!email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
            isValid = false;
        }

        this.setState({ errors });
        return isValid;
    };

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        } as Pick<State, keyof State>));
    };

    handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.validate()) {
            const { firstName, lastName, email } = this.state;
            const user = {
                first_name: firstName,
                last_name: lastName,
                email: email
            };

            try {
                await addUser(user);
                this.setState({ showSuccessCard: true });
            } catch (error) {
                console.error("Error submitting form:", error);
                this.setState({ showErrorCard: true, errorMessage: "An error occurred. Please try again." });
            }
        }
    };

    render() {
        const { firstName, lastName, email, errors, showSuccessCard, showErrorCard, errorMessage } = this.state;

        if (showSuccessCard) {
            return (
                <div className="card success-card">
                    <div className="card-body">
                        <h5 className="card-title">User added successfully!</h5>
                        <Button className="btn-info" onClick={() => this.setState({ showSuccessCard: false, firstName: "", lastName: "", email: "", errors: {} })}>
                            Add More User
                        </Button>
                        <Link to="/example" className="btn btn-info">
                            Return to Example
                        </Link>
                    </div>
                </div>
            );
        }

        if (showErrorCard) {
            return (
                <div className="card error-card">
                    <div className="card-body">
                        <h5 className="card-title">Error</h5>
                        <p>{errorMessage}</p>
                        <Button className="btn-info" onClick={() => this.setState({ showErrorCard: false })}>
                            Try Again
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div className="form-container">
                <h2>User Details</h2>
                <form className="project-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={this.handleChange}
                            placeholder="First Name"
                        />
                        {errors.firstName && <div className="error">{errors.firstName}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={this.handleChange}
                            placeholder="Last Name"
                        />
                        {errors.lastName && <div className="error">{errors.lastName}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            placeholder="Email"
                        />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="form-group button-group d-flex justify-content-center gap-2 mt-3">
                        <Button className="btn-info btn-lg" type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        );
    }
}
