#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#define N 3 /* define the total number of processes we want */
float total=0; /* Set global variable */


void *compute(void *arg){ /* compute function just does something. */
int i;
float result=0;
int pid = *(int*)arg;

for(i=0; i < 2000000000 ; i++) /* for a large number of times */
result = sqrt(1000.0) * sqrt(1000.0);

printf("Result of %d is %f ", pid, result); /* Prints the result */
total = total + result; /* to keep a running total in the global variable total */
printf("Total of %d is %f ", pid, total); /* Print running total so far. */
pthread_exit(NULL);

}

int main(){
    pthread_t tid[N];
    int i;
    pid[N];


for(i = 0; i < N; i++){ /* to loop and create the required number of processes */
    pid[i] = i;
    printf("ID for thread %d: %d\n", i, pid[i]);

    if(pthread_create(&tid[i], NULL, compute, &pid[i])){
        fprintf(stderr, "Error creating thread\n");
        exit(1);
    }
    }

    for(i = 0; i < N; i++){//wait for thread to finish
        pthread_join(tid[i], NULL);
        return 0
    }

}
