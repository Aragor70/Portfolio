import React from "react";



const CVTemplate = ({ projects = [] }: { projects: any[] }) => {

    return (
        <body>
            <main>
                <table>
                    <tr>
                        <td>
                            <h1>
                                Curriculum Vitae
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
export default CVTemplate;