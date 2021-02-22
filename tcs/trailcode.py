import pandas as pd
import requests
import time

url = 'http://localhost:3000/health'

dataset=pd.read_csv(r'C:\Users\niceb\Desktop\final.csv')
#print(dataset.head())
print(dataset.shape)
dataset=dataset.fillna(0)

x=dataset.iloc[:,[0,1,2,3,4,5,6,7,8,9,10,11]].values
y=dataset.iloc[:,[12,13,14,15,16]].values

from sklearn.model_selection import train_test_split
xtrain,xtest,ytrain,ytest=train_test_split(x,y,test_size=0.20,random_state=3)

from sklearn.neighbors import KNeighborsClassifier
model=KNeighborsClassifier(n_neighbors=10)
model.fit(xtrain,ytrain)

ypred=model.predict(xtest)

from sklearn.metrics import accuracy_score
print(accuracy_score(ytest,ypred)*100)
row=0
cnt=1
while True:
        data=pd.read_csv(r'C:\Users\niceb\Desktop\test1.csv')
        c = data.iloc[row:row+1,1: ].values
        a = model.predict(data.iloc[row:row+1,1: ].values)
        print(a)
        b = data['Unnamed: 0'][row:row+1]
        print(b)
        myobj = {'somekey': a,'uname':b,'inputdata':c}
        row+=1
        time.sleep(0.5)
        xyz = requests.post(url, data = myobj)
        




