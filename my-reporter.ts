import { Reporter, TestCase, TestResult, Suite } from '@playwright/test/reporter';

class MyReporter implements Reporter {
    onBegin(config: any, suite: Suite) {
        console.log(`Starting the run with ${suite.allTests().length} tests`);
    }

    onTestBegin(test: TestCase) {
        console.log(`Starting test: ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        console.log(`Finished test: ${test.title} with status ${result.status}`);
    }

    onEnd(result: any) {
        console.log(`Finished the run: ${result.status}`);
    }
}

export default MyReporter;
