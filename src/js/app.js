App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    return await App.initWeb3();
  },

  initWeb3: async function () {
    /*
     * Replace me...
     */
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    /*
     * Replace me...
     */
    $.getJSON("Adoption.json", function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn-adopt", App.handleAdopt);
  },

  markAdopted: function () {
    /*
     * Replace me...
     */
    var adoptionInstance;

    App.contracts.Adoption.deployed()
      .then(function (instance) {
        adoptionInstance = instance;

        return adoptionInstance.getAdopters.call();
      })
      .then(function (adopters) {
        for (i = 0; i < adopters.length; i++) {
          console.log(i);
          if (adopters[i] !== "0x0000000000000000000000000000000000000000") {
            console.log(i);
            if (i == 1) {
              $(".one").find("button").text(adopters[i]).attr("disabled", true);
            }
            if (i == 2) {
              $(".two").find("button").text(adopters[i]).attr("disabled", true);
            }
            if (i == 3) {
              $(".three")
                .find("button")
                .text(adopters[i])
                .attr("disabled", true);
            }
            if (i == 4) {
              $(".four")
                .find("button")
                .text(adopters[i])
                .attr("disabled", true);
            }
            if (i == 5) {
              $(".five")
                .find("button")
                .text(adopters[i])
                .attr("disabled", true);
            }
            if (i == 6) {
              $(".six").find("button").text(adopters[i]).attr("disabled", true);
            }
            if (i == 7) {
              $(".seven")
                .find("button")
                .text(adopters[i])
                .attr("disabled", true);
            }
            if (i == 8) {
              $(".eight")
                .find("button")
                .text(adopters[i])
                .attr("disabled", true);
            }
            if (i == 9) {
              $(".nine")
                .find("button")
                .text(adopters[i])
                .attr("disabled", true);
            }
          }
        }
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data("id"));

    /*
     * Replace me...
     */
    var adoptionInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed()
        .then(function (instance) {
          adoptionInstance = instance;

          // Execute adopt as a transaction by sending account
          return adoptionInstance.adopt(petId, { from: account });
        })
        .then(function (result) {
          return App.markAdopted();
        })
        .catch(function (err) {
          console.log(err.message);
        });
    });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
