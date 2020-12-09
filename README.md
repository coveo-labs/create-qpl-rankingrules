# create-qpl-rules 
Example on how to create (by using the Coveo API) automatic Query Pipeline Ranking Expressions with conditions.

There are 2 methods to do this:
* using Result Ranking calls (new)
* using Statement calls (older)

Both are included.

## Explanation

### API Key
In order to execute the script create a `Coveo API Key` with the following priviliges:
***Search > Query Pipelines > Edit All (or Custom and select the pipeline you are allowed to edit).***


### Using ResultRanking calls
1. (optional) First start by adding a `condition` to the platform (if you need it of course).

   Using: `https://platform.cloud.coveo.com/rest/search/v1/admin/pipelines/statements?organizationId=${settings.orgId}`

   See for the contents: `/config/condition.json`.

2. Next step is add the actual ResultRanking information to the platform.

   Using: `https://platform.cloud.coveo.com/rest/search/v2/admin/pipelines/${pipelineId}/resultRankings?organizationId=${settings.orgId}`

   See for the contents: `/config/resultranking.json`.

### Using Statement calls
1. (optional) First start by adding a `condition` to the platform (if you need it of course).

   Using: `https://platform.cloud.coveo.com/rest/search/v1/admin/pipelines/statements?organizationId=${settings.orgId}`

   See for the contents: `/config/condition.json`.

   Remark: With this approach you cannot select a `query` in the actual result ranking statement (which you can do when you use `ResultRanking calls`). So when you want to combine a timestamp + a query. You need to combine them into a single statement. Like:
`when ( ( $queryTimeUtc isBetween ${beginTime.toISOString()} and ${endTime.toISOString()} ) and $query is "${query}" )`

2. Next step is add the actual Ranking statement information to the platform.

   Using: `https://platform.cloud.coveo.com/rest/search/v2/admin/pipelines/${pipelineId}/statements?organizationId=${settings.orgId}`.
d
  See for the contents: `/config/resultranking_statement.json`.


## Requirements
Node JS => 8.0

Needed information:
* API Key (with admin rights)
* Organization Id
* Pipeline Id

### Before starting
rename `config_Example.js` to `config.js` and put the proper data in it.

## Setup

1. Fork / clone the repository.
2. `npm install` at the top of the repository.
3. Configuration of Coveo Cloud and Google API key
4. `npm run watch` at the top of the repository.
5. Open your browser and and paste in the url  

