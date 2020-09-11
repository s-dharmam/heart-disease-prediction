import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import sklearn 
import numpy as np


with open('model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('max_min.pkl', 'rb') as f:
    max_min = pickle.load(f)
    
app = Flask(__name__)
CORS(app)
@app.route('/home', methods=["POST"])
def heart_pred():
    
    content = request.get_json()
    array=[]
    array.append(int(content['age']))
    array.append(int(content['sex']))
    array.append(int(content['trestbps']))
    array.append(int(content['chol']))
    array.append(int(content['fbs']))
    array.append(int(content['restecg']))
    array.append(int(content['thalach']))
    array.append(int(content['exang']))
    array.append(float(content['oldpeak']))
    array.append(float(content['ca']))
    array.append(int(content['cp']==0))
    array.append(int(content['cp']==1))
    array.append(int(content['cp']==2))
    array.append(int(content['cp']==3))
    array.append(int(content['thal']==0))
    array.append(int(content['thal']==1))
    array.append(int(content['thal']==2))
    array.append(int(content['thal']==3))
    array.append(int(content['slope']==0))
    array.append(int(content['slope']==1))
    array.append(int(content['slope']==2))
    np_array = np.array(array)
    
    np_array=(np_array-max_min[1])/(max_min[0]-max_min[1])
    np_array = np.array(np_array)[np.newaxis]
    ans_ar = model.predict_proba(np_array)
    ans = ans_ar[0][0]*100
    ans = jsonify(ans)
    

    return ans


if __name__ == '__main__':
    app.run(debug=True)
