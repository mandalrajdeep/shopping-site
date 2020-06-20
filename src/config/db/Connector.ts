import mongoose from 'mongoose';

class Connector {
    private uri;

    public constructor(uri) {
        this.uri = uri;
    }

    public connect() {
        mongoose.connect(
            this.uri,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
            (err) => {
                if (err) {
                    console.log(`DB Error: ${err.message}`);
                }
            },
        );
    }
}

export default Connector;
