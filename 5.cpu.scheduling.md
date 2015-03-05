CPU Scheduling
===

#### Background
- Burst cycle
  - Process execution consists of a cycle of
  CPU execution and I/O wait.
  - Process alternates between these two
  states.
  - Process always begins and ends with a
  CPU burst.
  - ![CPU-I/O Burst Cycle](http://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter6/6_01_CPU_BurstCycle.jpg "CPU-I/O Burst Cycle")
- Burst times
  - Durations of CPU bursts have a typical frequency curve (exponential or hyper-exponential):
    - many short bursts – an I/O bound program
    - a few long bursts – a CPU bound program.
    - ![Histogram of CPU-Burst Times](http://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter6/6_02_CPU_Histogram.jpg "Histogram of CPU-Burst Times")
- CPU Scheduler
  - CPU scheduler (short-term scheduler) selects from among the processes
  in memory that are ready to execute, and allocates the CPU to one of them
  - CPU scheduling decisions may take place when a process:
    1. Switches from running to waiting state
    2. Switches from running to ready state
    3. Switches from waiting to ready state
    4. Terminates
  - Scheduling only under 1 and 4 is **nonpreemptive**
    - Once the CPU is allocated to a process, the process keeps the CPU until it switches to waiting state or terminates.
  - All other scheduling is **preemptive**
    - Incurs an overhead
- Dispatcher
  - Dispatcher module gives control of the CPU to the
  process selected by the short-term scheduler; this
  involves:
    - switching context
    - switching to user mode
    - jumping to the proper location in the user program to restart that program
  - **Dispatch latency** – time it takes for the dispatcher to stop one process and start another running
- Scheduling criteria
  - **CPU utilization** – keep the CPU as busy as possible
  - **Throughput** – # of processes that complete their execution per time unit
  - **Turnaround time** – amount of time to execute a particular process
  - **Waiting time** – amount of time a process has been waiting in the ready queue
  - **Response time** – amount of time it takes from when a request was submitted until the first response is produced
- Optimization criteria
  - Max CPU utilization
  - Max throughput
  - Min turnaround time
  - Min waiting time
  - Min response time
  - *Optimize the max/min values or average measure or variance.*

#### Various scheduling methods
- **First-Come, First-Served (FCFS)**
  - FCFS is the simplest CPU-scheduling algorithm (i.e., no scheduling?)
    - The process that requests the CPU first is allocated the CPU first.
  - Implemented with a FIFO queue
    - PCB of a new process is linked onto the tail of the ready queue.
    - Process at the head of the queue gets CPU first.
  - Average waiting time varies a lot and is quite long – depending on the order and CPU usage properties of coming requests
  - FCFS is non-preemptive – a process keeps the CPU until it releases it, either by **terminating** or by **requesting I/O**.
- **Shortest-Job-First (SJF)**
  - Two schemes:
    - **nonpreemptive** – once CPU given to the process it cannot be preempted until completes its CPU burst.
    - **preemptive** – if a new process arrives with CPU burst length less than remaining time of current executing process, preempt. This scheme is known as the **Shortest-Remaining-Time-First** (**SRTF**).
  - Preemptive improves average waiting time
  - SJF algorithm
    - Associate with each process the length of its next CPU burst.
    - Use these lengths to schedule the process with the shortest time
    - If CPU bursts are the same, FCFS is used to break the tire
    - A more accurate name – shortest-next-CPU-burst scheduling
  - SJF is optimal – gives minimum average waiting time for a given set
  of processes
    - Moving short job before a long one decreases the waiting time of the
    short job more than the increase of the waiting time of the long job
    - *The difficulty is knowing the length of the next CPU request*
      - In long-term scheduling, users may provide estimated process time limit (if a job exceeds time limit, it will be resubmitted)
- **Burst time prediction** (**exponential averaging**)
  - Challenge of SJF – How to know the length of the next CPU request
    - Can only estimate (predict) the length – a common approach
  - Approximate prediction of the length of next CPU burst:
    - From the lengths of previous CPU bursts by using exponential averaging
    - Running average of each burst for each process.
  - Exponential averaging technique:
  - ![Exponential averaging technique](http://i.imgur.com/8Itk6vu.jpg "Exponential averaging technique")
  - Commonly, α set to ½"
- **Priority scheduling**
  - A priority number (integer) is associated with each process
    - Scheduling based on priories
    - FCFS is used to break the tie, if equal priorities are found
    - SJF is priority scheduling where priority is the inverse of predicted next CPU burst time
  - The CPU is allocated to the process with the highest priority (smallest integer ≡ highest priority)
    - Preemptive – High-priority new arrivals preempt the CPU
    - Nonpreemptive – simply put the job to the head of ready queue
  - Problem ≡ **Starvation** – low priority processes may never execute
  - Solution ≡ **Aging** – as time progresses increase the priority of the process
- **Round Robin (RR)**
  - Each process gets a small unit of CPU time (**time quantum** q), usually
  10-100 milliseconds. After this time has elapsed, the process is
  preempted and added to the end of the ready queue.
    - If less than a time quantum, CPU is released voluntarily.
    - If longer than a time quantum, timer interrupts the running process
  - If there are n processes in the ready queue and the time quantum is q,
  then each process gets 1/n of the CPU time in chunks of at most q time
  units at once.
    - Bound waiting time – No process waits more than (n-1)q time units.
  - Performance
    - q large ⇒ FIFO
    - q small ⇒ q must be large with respect to context switch, otherwise
  overhead is too high
- **Real-time**

#### Multilevel queue
- Ready queue is partitioned into separate queues, eg:
  - foreground (interactive)
  - background (batch)
- Processes permanently assigned in a given queue based on their
prosperities (e.g., memory size, priority, type)
- Each queue has its own scheduling algorithm:
  - E.g., foreground – RR, background – FCFS
- Scheduling must be done between the queues:
  - Fixed priority scheduling; (i.e., serve all from foreground then from
background) – Possibility of starvation.
  - Time slice – each queue gets a certain amount of CPU time which it
can schedule amongst its processes;
    - 80% to foreground in RR
    - 20% to background in FCFS
- Multilevel queue scheduling
  - Each queue has absolute priority over lower-priority queues
  - ![Multilevel queue scheduling](http://www.cs.odu.edu/~cs471w/spring11/lectures/Scheduling_files/image013.jpg "Multilevel queue scheduling")
- Multilevel feedback queue
  - A process can move between the various queues; aging can be implemented this way
  - Multilevel-feedback-queue scheduler defined by the following parameters:
    - number of queues
    - scheduling **algorithms** for each queue
    - method used to determine when to **upgrade** a process
    - method used to determine when to **demote** a process
    - method used to determine which queue a process will enter when that process needs service

#### Multiple processor scheduling
- CPU scheduling more complex when multiple CPUs are available
- **Homogeneous** (identical) processors within a multiprocessor system
- Symmetric and antisymmetric multiprocessing
  - **Asymmetric multiprocessing** – one single processor (called master server)
  does all scheduling including I/O processing and other system activities
    - Other processors execute only user codes.
  - **Symmetric multiprocessing** (SMP) - Each processor is self-scheduling
    - Provide a separate queue for each processor
    - Use a common ready queue
    - Two issues: Processor affinity and load balancing
- Symmetric multithreading (SMT)
  - Symmetric multithreading (SMT) - runs several threads at a time by
  providing multiple logical rather than physical processors
    - Also known as hyperthreading technology on Intel processors
  - Each logical processor has its own architecture state (registers, interrupt
  handling) supported in hardware level.
    - To create multiple logical processors on the same physical processor
  - Figure illustrates that four processors are available for work on this system from OS’s perspective.
  - ![Symmetric multithreading (SMT)](http://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter5/5_08B_SMT_Architecture.jpg "Symmetric multithreading (SMT)")
  - Multiple threads per core also growing (SMT)
    - Takes advantage of memory stall to make progress on another thread
while memory retrieve happens
    - ![Symmetric multithreading (SMT)](http://i.imgur.com/EHBj319.jpg "Symmetric multithreading (SMT)")
  - If SMP, need to keep all CPUs loaded for efficiency
  - Load balancing attempts to keep workload evenly distributed
  - Task migration
    - Push migration – periodic task checks load on each
    processor, and if found pushes task from overloaded CPU to
    other CPUs
    - Pull migration – idle processors pulls waiting task from busy
    processor

#### Thread Scheduling
- Lightweight process (LWP) maps an user-level thread to an associated
kernel level thread
  - Distinction between user-level and kernel-level threads
  - When threads supported, threads scheduled, not processes
- Many-to-one and many-to-many models, thread library schedules userlevel
threads to run on LWP
  - Known as **process-contention scope** (**PCS**) since scheduling
  - *competition is within the process*
  - Typically done via priority *set by programmer*
  - Library schedules user threads to LWPs (not mean run on CPUs)
- Kernel thread scheduled onto available CPU is **system-contention
scope** (**SCS**)
  - *competition among all threads in system*
- Example: Pthread API with PCS or SCS during thread creation
  - PTHREAD_SCOPE_PROCESS – using PCS scheduling
  - PTHREAD_SCOPE_SYSTEM – using SCS scheduling (1-1)

#### Real-Time CPU Scheduling
- Can present obvious challenges
- Soft real-time systems – no guarantee as to when critical realtime process will be scheduled
- Hard real-time systems – task
must be serviced by its deadline
- Two types of latencies affect
performance
  1. **Interrupt latency** – time from
  arrival of interrupt to start of routine
  that services interrupt
  2. **Dispatch latency** – time for
  scheduler to take current process
  off CPU and switch to another

#### Virtualization and Scheduling
- Virtualization software schedules multiple guests onto CPU(s)
- Each guest doing its own scheduling
  - Not knowing it doesn't own the CPUs
  - Can result in poor response time
  - Can effect time-of-day clocks in guests
- Can undo good scheduling algorithm efforts of guests

#### Algorithm evaluation
- Deterministic modeling
  - Analytical evaluation of an algorithm:
    - Takes a particular predetermined workload.
    - Produces a formula or number to define the performance of
    the algorithm for that workload

| Process        | Burst Time           |
| ------------- | ------------- |
| P1      | 10 |
| P2      | 29      |
| P3 | 3      |
|  P4 | 7 |
|  P5 | 12 |

  - Consider FCFS, SJF, and RR (quantum = 10 ms): Which algorithm would give the minimum average waiting time?
    - For each algorithm, calculate minimum average waiting time
    - Simple and fast, but requires exact numbers for input, applies
only to those inputs
      - FCFS is 28ms
        - P1, P2, P3, P4, P5
        - (0+10+39+42+49)/5 = 28
      - Non-preemptive SFJ is 13ms
        - P3, P4, P1, P5, P2
        - (0+3+10+20+32) = 13
      - RR is 23ms
        - P1, P2, P3, P4, P5, P2, P5, P2
        - (0+(52-2(10))+20+23+50-(1(10))) = 23

- Queuing Algorithm
  - Queuing models
    - CPU burst distribution
    - Arrival time distribution
  - Little’s formula: `average queue length = average arrival rate X average waiting time in the queue.`
    - Compute one variable if you know the other two.
  - Knowing arrival rates and service rates, one can compute
  utilization, average queue length, average wait time.
  - **Littles Formula**
    - n = average queue length
    - W = average waiting time in queue
    - λ = average arrival rate into queue
    - Littles law
     - in steady state, processes leaving queue
    must equal processes arriving, thus:
        - `n = λ x W`
      - Valid for any scheduling algorithm and arrival
    distribution
    - For example, if on average 7 processes arrive per
    second, and normally 14 processes in queue, then
    average wait time per process = 2 seconds
- Simulations
  - A more accurate evaluation
    - Program a model of the computer system – A Simulator.
  - OSP – operating system project
    - A collection of Java/C modules that together implement an OS.
  - As the simulation executes, statistics that indicate algorithm
  performance are gathered and printed.
  - Data to drive simulation:
    - Random-number generator
    - **Trace tapes** – recorded sequence of actual events.
    - ![Simulation](http://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter6/6_25_SchedulerSimulation.jpg "Simulations")
- Implementation
  - Even simulations have limited accuracy
  - Just implement new scheduler and test in real systems
  - High cost, high risk
  - Environments vary
  - Most flexible schedulers can be modified per-site or
  per-system
  - Or APIs to modify priorities
  - But again environments vary

#### OS examples
- Solaris
  - **Priority-based scheduling**
  - Six classes available
    - Time sharing (default) (TS)
    - Interactive (IA)
    - Real time (RT)
    - System (SYS)
    - Fair Share (FSS)
    - Fixed priority (FP)
  - Given thread can be in one class at a time
  - Each class has its own scheduling algorithm
  - Time sharing is multi-level feedback queue
    - Loadable table configurable by sysadmin
  - Scheduler converts class-specific priorities into a per-thread global priority
    - Thread with highest priority runs next
    - Runs until (1) blocks, (2) uses time slice, (3) preempted
      - Time quantum expired # CPU intensive, lower its priority
      - Return from sleep # IO intensive, increase its priority
    - Multiple threads at same priority selected via RR
- Windows XP
  - Windows uses **priority-based preemptive scheduling**
  - Highest-priority thread runs next
  - **Dispatcher** is scheduler
  - Thread runs until (1) blocks, (2) uses time slice, (3) preempted
  by higher-priority thread
  - Real-time threads can preempt non-real-time
  - 32-level priority scheme
  - **Variable class** is 1-15, **real-time class** is 16-31
  - Priority 0 is memory-management thread
  - Queue for each priority
  - If no run-able thread, runs **idle thread**
- Linux
  - **Completely Fair Scheduler** (CFS)
  - **Scheduling classes**
    - Each has specific priority
    - Scheduler picks highest priority task in highest scheduling class
    - Rather than quantum based on fixed time allotments, based on **proportion of CPU time**
    - 2 scheduling classes included, others can be added
      1. default
      2. real-time
  - Quantum calculated based on **nice value** from -20 to +19
    - **Lower value is higher priority**
    - Calculates **target latency** – interval of time during which task should run at least once
    - Target latency can increase if the number of active tasks increases
  - CFS scheduler maintains per task **virtual run time** in variable vruntime
    - Associated with decay factor based on priority of task – lower priority is higher decay rate
    - Normal default priority yields virtual run time = actual run time
  - To decide next task to run, scheduler picks task with lowest virtual run time

#### Summary
  - CPU scheduling selects a process from the ready queue and the dispatcher allocates
  the CPU to the selected process.
  - FCFS scheduling is the simplest approach but it can hurt short processes
  - SJF scheduling is optimal, providing the shortest average waiting time.
    - It suffers from problems of predicting the length of the next CPU burst and starvation.
    - *SJF can be preemptive or non-preemptive.*
  - Priority-scheduling algorithm allocates the CPU to the highest-priority process.
  - RR allocates the CPU to all processes in time slice so it is appropriate for time-sharing
  system.
    - *RR is always preemptive.*
  - Multilevel queue algorithms allow different algorithms in different queues (interactive
  and background) and also allow processes to move from one queue to another.
  - Multiprocessor and real-time scheduling are more challenging.
  - Four ways of evaluating scheduling algorithms
    - Deterministic modeling
    - queuing models
    - simulations
    - implementation.
  - Real operating systems use a combination of different algorithms.
