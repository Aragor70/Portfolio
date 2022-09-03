import React from "react";



const ExperiencesTemplate = ({ projects = [] }: { projects: any[] }) => {

    return (
        <body>
            <main>
                <table>
                    <tr>
                        <td>
                            <h1>
                                Work Experience
                            </h1>
                        </td>
                    </tr>
                    {
                        projects.map((element: any) => <tr key={element.id}><td>{ element.name || 'N/A' }</td><td>{ element.name || 'N/A' }</td></tr>)
                    } 
                </table>
            </main>
        </body>
    );
}
export default ExperiencesTemplate;