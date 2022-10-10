import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export const SendCode = ({code, setCode, Verify, reSendCode, sentStatus})  =>{

    return(
        <Form className="Login_form_container" onSubmit={Verify}>
            <Form.Group className="mb-3">
                <div> <h3 className="verify-label">Verify Account</h3></div>
                <Form.Control type="text" placeholder="Enter veridication code" 
                value={code} onChange={(e) => setCode(e.target.value)} required/>
            </Form.Group>
            {sentStatus ? <p className='sent-label'>{sentStatus}</p> :
            <button onClick={reSendCode} className="resend-button sent-label">Resend code</button>}
            <Button variant="primary" type="submit">Verify</Button>
        </Form>
    )
}