const INSTANCE_URI = 'http://127.0.0.1:5173/';

export const Output = () => {
    return (
        <div style={{ height: "40vh", background: 'white' }}>
            <iframe src={INSTANCE_URI} width={"100%"} height={"100%"} title="output"></iframe>
        </div>
    )

};