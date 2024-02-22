import * as rimraf from "rimraf";
import * as path from "path";

const testDatabaseDirectory = path.join(__dirname, "tmp_e2e_tests");

rimraf.sync(testDatabaseDirectory);
