import React, { Fragment, useEffect } from 'react';

import { withRouter } from 'react-router-dom';

const AT = ({ setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle('Messages')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])


    /* const [messages, setMessages] = useState<any[]>([]) */



    return (
        <Fragment>
            <div className="section-content">
                <div className="params">
                
                    <h3 style={{ display: 'flex', justifyContent: "center" }}>Messages</h3>

                    

                </div>

            </div>
        </Fragment>
            
    );
}
export default withRouter(AT);