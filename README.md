# Calliv
## A calibration tool for biological sciences
### Why I started Calliv
I needed practice and repos to show in interviews and stuff. I am biotechnology student and I pursue the objective of working with AI and Deep learning for biological science. Mix those toghether and Calliv was born.
### What does calliv do?
In biological science is a common practice in essays to determine the value of a property in a given protein or element by interpolation. The measurement of a given property such as absorbance, fluorescence, radiation, electrical resistance, temperature, etc. is observed for a set number of standards creating a curve based on the masured values of such standards. Then, the unknown value is measured and with that value the interpolation value is calculated.
Calliv is a solution that recieves a matrix of each standard and its measured value, displays the data in a convenient way and you can fit a regression model that fits the data.
### How does Calliv achieves that
Calliv takes care of an uploaded CSV with a matrix of the results of the essay, orders the data in a way it's useful and displays it.
Then you can fit a regression model to the data, in order to choose a best fit for the interpolation.
Data is drawn in order to discard potential outliers.
### Versioning
#### 1.0 or Old
Version 1.0 (or old) goes through this thought process in a pure front-end Vue environment. It uses local storage to store data and various packages to achieve the goal. It's code is messy, considering the experience I had in coding at the moment I started it. On May 2021, I decided it was better to start from scratch, centering development on a NuxtJS environment, cleaning the code and applying new knowledge acquired by practice.
You can still download that version, with the following considerations:
- X axis standards are hardcoded
- Only lineal regression is working
### EOL notes
After some time I felt the project was over, and I decided to finish it. It was definitely a great learining experience, in which I would like to share some of the things I learned.
- Monolithic application with Vue, NuxtJS and Vuex. Both with SSR and no SSR.
- Component handling and state management with Vuex.
- Linear regression with TensorFlow.js.
- Array manipulation
- Multidimentional arrays management, handling and rendering
- Object handling
- Thoughts about User Interface and User Experience (UI/UX)
### Moving forward
With the learning of Docker and Docker-compose, I decided to move to a microservices architecture for future projects. Also I want to move on learning new languages and frameworks in this everlearning process of coding. I am aiming at:
-  GraphQL
-  Solidity
-  Rust
-  Python
-  Other frameworks used in data science
### Feel free to contact
If you are a recruiter or simply interested on the idea, feel free to contact me.
### MIT LICENSE
Copyright 2022 Iasi Salomon

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.