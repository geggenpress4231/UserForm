import React from "react";

export class Home extends React.Component<{}, {}> {
    public componentDidMount() {
        document.title = "User Database - My React Application";
    }

    public render(): JSX.Element {
        return (
            <div>
                <h1>User Database Application</h1>

                <div className="row">
                    <div className="col-lg-12">
                        <h2>Introduction</h2>
                        <hr />
                        <p>
                            Welcome to the User Database Application. This application is designed to showcase a Proof of Concept (PoC) for adding, editing, creating, and deleting users in a table.
                        </p>
                        <p>
                            This project provides a simple yet powerful interface to perform all CRUD (Create, Read, Update, Delete) operations on user data. It is an example of a well-structured and maintainable web application.
                        </p>
                        <p>
                            You can utilize this application to manage user information effectively, ensuring data integrity and user-friendly interactions.
                        </p>
                        <p>
                            This application has been designed and developed following best practices in code quality, structure, and user experience. Feel free to explore and modify the code to suit your needs.
                        </p>
                        <p>
                            We expect the code to be production-quality, with all necessary features and improvements that you deem necessary for a robust application.
                        </p>
                    </div>

                    <h2>Features</h2>
                    <hr />

                    <div>
                        <ul className="b">
                            <li>
                                <strong>User Management:</strong> A comprehensive form to add new users, ensuring unique email validation and mandatory first name and last name fields.
                            </li>
                            <li>
                                <strong>Formatted Dates:</strong> Display dates in the user list in the format YYYY/MM/DD for consistency and readability.
                            </li>
                            <li>
                                <strong>Search Capability:</strong> Easily search through the user list with a single text field to find specific users quickly.
                            </li>
                            <li>
                                <strong>Pagination:</strong> Navigate through the user list with next and previous buttons, displaying 30 items at a time for optimal performance and user experience.
                            </li>
                            <li>
                                <strong>Automatic Loading:</strong> The User List tab automatically loads the first 30 items on initial load for convenience.
                            </li>
                        </ul>
                    </div>

                    <h2>Code Quality</h2>
                    <hr />

                    <div>
                        <ul className="b">
                            <li>Clean code: use of best practices</li>
                            <li>Refactored for better structure and maintainability</li>
                        </ul>
                    </div>

                    

                    <div>
                        <ul className="b">
                            <li>Focus on functionality over UI design. The interface should be clean and usable.</li>
                            <li>If there are any unfinished features or improvements, comments are provided in the code with explanations and time estimates.</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
