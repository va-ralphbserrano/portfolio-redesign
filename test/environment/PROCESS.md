# Test Environment Process 

 Environment Structure
```
/test/environment/
├── PROCESS.md         # Process guidelines and formatting rules
├── TEST_ENVIRONMENT.md  # Main documentation and tracking
├── sessions/           # Detailed session logs
│   └── Session.X      # Individual session records
└── stability/         # Test stability cases
```

## Formatting Guidelines 

### Session Files
```
Session X - YYYY-MM-DD
Status: [FAIL/PASS/IN_PROGRESS]

Focus: [One-line description]

Changes Made:
1. [Major change category]:
   - Specific change
   - Impact or result
   - Error if relevant

2. [Another category]:
   - Details
   - Results

Results:
- Outcome 1
- Outcome 2

Analysis:
1. [Finding category]
   - Details
   - Implications

Next Steps:
1. Action item
2. Action item

Command used: [exact command]
```

### TEST_ENVIRONMENT.md
```
### Session X (YYYY-MM-DD)
Status: [STATUS] | [Session.X]
Changes:
- Change 1 with impact
- Change 2 with impact
- Error: [error message]
- Location: [file:line]
```

### Issue Format
```
| ID    | Issue                  | First Seen | Status | Deps | Blockers |
|-------|------------------------|------------|--------|------|----------|
| [XXX] | [Descriptive summary] | Session X  | Active | -    | -        |
```

## Process Guidelines 

### 1. Review Phase 
Before ANY changes:
- Review ALL session logs chronologically
- Cross-reference with TEST_ENVIRONMENT.md
- Identify patterns and dependencies
- Update Issue Tracker if new issues found
- Verify position in Solution Roadmap
 NO exceptions to this review process!

### 2. Implementation Phase 
Follow strictly in order:
1. Check Solution Roadmap phase
2. Address issues by priority:
   ```
   Priority Order:
   1. Critical (C-series) → By dependencies
   2. Major (M-series)    → After related C-series
   3. Infrastructure (I-series) → If independent
   ```
3. Run tests: `npx vitest run` ONLY
   - Never use `npm test`
   - Document ALL test runs
   - Include full error logs

### 3. Documentation Phase 
For EVERY change:
1. Create new `Session.X`:
   - Status (FAIL/PASS/IN_PROGRESS)
   - Changes made
   - Test results
   - Error analysis
   - Next steps
   - Follow formatting guidelines

2. Update TEST_ENVIRONMENT.md:
   - Session summary
   - Issue Tracker updates
   - Dependency Graph changes
   - Solution Roadmap progress
   - Follow formatting guidelines

 Critical Rules:
1. Process Rules
   - Never skip Review Phase
   - Document EVERYTHING
   - Follow dependency order
   - Update tracking systems
   - No exceptions to process

2. Documentation Rules
   - Follow formatting guidelines exactly
   - Use consistent naming conventions
   - Include all required sections
   - Cross-reference related items
   - Keep issue tracking up-to-date

3. Testing Rules
   - Only use `npx vitest run`
   - Document every test run
   - Include complete error logs
   - Follow error resolution order
   - Update test stability cases
