Operating Systems
=========

Markdown lecture notes for [CSC 4103: Operating Systems, Spring 2015](http://www.csc.lsu.edu/~fchen/class/csc4103-sp15/).

Nearly all credit to  authors Silberschatz, Galvin, and Gagne and course instructor [Dr. Feng Chen](http://www.csc.lsu.edu/~fchen/).

Description
---

CSC 4103: Operating Systems introduces operating system concepts and designs, including operating system structures, process and thread, CPU scheduling, process synchronization and deadlocks, main memory, virtual memory, file system interface and implementation, mass storage structure, I/O systems, protection and security, UNIX system basics and shell programming, etc.

Textbooks
---

- [Operating System Concepts](http://www.amazon.com/Operating-System-Concepts-Abraham-Silberschatz/dp/1118112733/ref=sr_1_5?ie=UTF8&qid=1421887962&sr=8-5&keywords=operating+systems+concepts), 8e, 8e/update, or 9e (Silberschatz, Galvin, and Gagne; 2009, 2011, or 2012) [Required].
  - Note: Digital editions are available with kindle on Amazon.com.
  - Java version ([Operating System Concepts with Java](http://www.amazon.com/Operating-System-Concepts-Abraham-Silberschatz/dp/047050949X/ref=sr_1_1?ie=UTF8&qid=1389745421&sr=8-1&keywords=operating+systems+concepts+with+java), 8th Edition) is also available.
- [Learning the bash Shell: Unix Shell Programming](http://www.amazon.com/Learning-bash-Shell-Programming-Nutshell/dp/0596009658/ref=sr_1_1?ie=UTF8&qid=1389745485&sr=8-1&keywords=learning+the+bash), 3rd Edition (Newham, 2005) [Recommended].

Markdown -> PDF Generation
---

### Requirements
- [Node.js](http://nodejs.org/)

### Installation
```bash
git clone git@github.com:selbyk/operating-systems.git
cd operating-systems
npm install --save
```

### Generating PDFs
```bash
node ./to-pdf.js
```
