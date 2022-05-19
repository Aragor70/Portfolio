import React, { Fragment } from 'react';
/* 
import { ReactComponent as CommitSvg} from '../style/icons/code-commit-solid.svg'
import { ReactComponent as UpdateSvg} from '../style/icons/refresh-outline.svg'
import { ReactComponent as CreateSvg} from '../style/icons/create-outline.svg' */

const Timeline = ({  }: any) => {

    return (
        <Fragment>
            <section className="timeline">

                <article>

                    <div>

                        <div className="story marked left">                            
                            <div>
                                <h3 className="content-center"><span style={{ fontSize: '45px' }}>Content management</span></h3>
                                <p>
                                    Website dedicated to the NiVest Software company. Project is to allow every user to manage the content of the another projects.
                                </p>
                                <p>
                                    Website dedicated to the NiVest Software company. Project is to allow every user to manage the content of the another projects.
                                </p>
                                
                            </div>
                        </div>
                        
                        <div className="story marked left">                            
                            <div>
                                <h3 className="content-center"><span style={{ fontSize: '45px' }}>Content management</span></h3>
                                <p>
                                    Website dedicated to the NiVest Software company. Project is to allow every user to manage the content of the another projects.
                                </p>
                                <p>
                                    Website dedicated to the NiVest Software company. Project is to allow every user to manage the content of the another projects.
                                </p>
                                
                            </div>
                        </div>


                    </div>
                    <div></div>
                    <div>
                        

                        <div className="story marked right">
                            
                            <div>
                                <h3 className="content-center"><span style={{ fontSize: '45px' }}>Content management</span></h3>
                                <p>
                                    Website dedicated to the NiVest Software company. Project is to allow every user to manage the content of the another projects.
                                </p>
                                <p>
                                    Website dedicated to the NiVest Software company. Project is to allow every user to manage the content of the another projects.
                                </p>
                                
                            </div>

                        </div>

                    </div>

                </article>

            </section>
        </Fragment>
    );
}
export default Timeline;