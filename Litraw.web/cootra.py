from numpy import arange,array,ones,linalg
#from pylab import plot,show

#xi = arange(0,9)
#A = array([ xi, ones(9)])
# linearly generated sequence
#y = [19, 20, 20.5, 21.5, 22, 23, 23, 25.5, 24]
#w = linalg.lstsq(A.T,y)[0] # obtaining the parameters

# plotting the line
#line = w[0]*xi+w[1] # regression line
#plot(xi,line,'r-',xi,y,'o')
#show()

x = [28.78143, 28.7813, 28.79646, 28.8, 28.778, 28.768, 28.778, 28.78678, 28.811, 28.811, 28.76868, 28.768, 28.81, 28.8, 28.765, 28.78678]
y = [5389.5, 5417, 7404, 7812.5, 4937, 3636, 4964, 6096, 9294, 9289.5, 3734.5, 3628.5, 9129.5, 7869, 3256.5, 6101.5]

A = array([x, ones(len(x))])
a, b = linalg.lstsq(A.T, y)[0]

print("\nThe coefficients of the longitude to svg-x function are:")
print("slope: ", a, "y-intercept: ", b)

A = array([y, ones(len(y))])
a, b = linalg.lstsq(A.T, x)[0]

print("\nThe coefficients of the svg-x to longitude function are:")
print("slope: ", a, "y-intercept: ", b)

x = [41.0275, 41.05519, 41.05468, 40.995, 40.984, 41.0066, 40.98662, 40.99137, 41.037, 41.03275, 41.01833, 41.0066, 41.00055, 41.05571, 41.037, 40.99137]
y = [5999, 1169.5, 1260.5, 11612.5, 13498, 9577, 13038.5, 12227, 4313.5, 5035, 7524, 9576.5, 10661.5, 1087, 4303, 12232]

A = array([x, ones(len(x))])
a, b = linalg.lstsq(A.T, y)[0]

print("\nThe coefficients of the latitude to svg-y function are:")
print("slope: ", a, "y-intercept: ", b)

A = array([y, ones(len(y))])
a, b = linalg.lstsq(A.T, x)[0]

print("\nThe coefficients of the svg-y to latitude function are:")
print("slope: ", a, "y-intercept: ", b)
