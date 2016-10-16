import subprocess
import httplib
from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/", methods=['POST'])
def execR():
    ##args = ("../Definition.R", "banana")
    ##os.execvp("Rscript", args)
    print "data ", request.data
    definition = subprocess.check_output(["Rscript", "../Definition.R", request.data])
    definition = definition[len(request.data):]
    print definition
    return definition


if __name__ == "__main__":
    app.run()
