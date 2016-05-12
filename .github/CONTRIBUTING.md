Contributing
------------

1. [How to contribute](#how-to-contribute)
    * [Reporting a bug](#reporting-a-bug)
    * [Writing a pull request](#writing-a-pull-request)
2. [Documentation](#documentation)

## How to contribute

If you are reading this you probably want to contribute, so thanks! Maintaining an open-source project is hard work and any help is welcome.

### Reporting a bug

If you find a bug, before reporting it, check if it's not [already reported][issues].  

If you're the first one to report it, please, follow those recommendations: 
- Write a clear and precise title
- Write a description which contain a scenario on how to reproduce the bug. Feel free to post a link to [Plunker][plunker]
- You'll never be too precise so don't hesitate to give more informations: OS, browser, node version...

### Writing a pull request

**Please follow these basic steps to simplify pull request reviews - if you don't you'll probably just be asked to anyway.**

Fork the [hm-admin][hm-admin] project and work on your own fork.  
You have to work on a branch with a clear name (feature/writing-how-to-contribute for example). Prefixing your branch by 
"feature/" (for new feature) and "hotfix/" (for issue resolving) is a good practice.

When your work is done:
 
- Rebase your branch on the current master
- Be sure that all tests pass, your code is lint free and the code coverage is still higher than 90%. You can run `ng test` to check
- Squash your commits to one commit and follow those recommendations about [writing good commit message][writing-good-commit-message]
- Build a pull request via github from your yourFork/yourBranch to the hm-admin/master branch
 
### Write some Tests

Don't forget to write tests about your component. I'm sure that your work is pretty awesome, but writing tests could help 
to avoid regression in the future.  
Follow recommendations about [writing test in angular2][writing-test].  
When your tests pass and only after that, you can [propose a pull request][pr]



## Documentation
- [Writing good commit message][writing-good-commit-message]
- [Writing test in Angular 2][writing-test]

[hm-admin]: https://github.com/coopTilleuls/hm-admin/
[issues]: https://github.com/coopTilleuls/hm-admin/issues
[pr]: https://github.com/coopTilleuls/hm-admin/pulls
[writing-good-commit-message]: https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines
[writing-test]: https://medium.com/google-developer-experts/angular-2-unit-testing-with-jasmine-defe20421584#.ymzbmrloz
