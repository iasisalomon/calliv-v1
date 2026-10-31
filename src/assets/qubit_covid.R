Illumina_placa_1_data <- read.csv("~/Vic/Pacu/QUBIT/Qubit Covid_data_csv.csv")
View(Illumina_placa_1_data)
x <-Illumina_placa_1_data[,3]
m <-matrix( nr=41, nc=3, byrow = TRUE)
for (j in 1:41) {
  m[j, 1:3]=Re(solve(polynomial(c(348.45-(x[j]+3013.73), 820.67, -2.4872, -0.0415))))
  #j <- j+1 
}
n<-cbind(Illumina_placa_1_data, m)
write.csv(n, file="ResQUBIT_pl1.csv", quote = FALSE,  eol = "\r", row.names = FALSE)

#-0.0415x3 + 2.4872x2 + 820.67x + 348.45
