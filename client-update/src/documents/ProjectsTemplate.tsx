import React from "react";

const ProjectsTemplate = ({ projects = [] }: { projects: any[] }) => {
    return (
        <body>
            <main>
                <table>
                    <tr>
                        <td>
                            <h1>
                                Projects
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
export default ProjectsTemplate;