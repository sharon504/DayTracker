{
  inputs = {
    nixpkgs = {
      url = "github:nixos/nixpkgs/nixos-23.05";
    };
    flake-utils = {
      url = "github:numtide/flake-utils";
    };
  };
  outputs = { nixpkgs, flake-utils, ... }: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs {
        inherit system;
      };
      # myWerkzeug = pkgs.python311Packages.werkzeug.overrideAttrs (oldAttrs: rec {
      #     postPatch = ''
      #       substituteInPlace werkzeug/_reloader.py \
      #           --replace "rv = [sys.executable]" "return sys.argv"
      #       '';
      # doCheck = false;
      # });
      # myFlask = pkgs.python311Packages.flask.override ({ werkzeug = myWerkzeug; });
    in rec {
      devShell = pkgs.mkShell {
        buildInputs = with pkgs; [
          (python311.withPackages(ps: with ps; [
            flask
            flask-sqlalchemy
            oauthlib
            piexif
            pillow
            oauth2
            virtualenv
            pip
          ]))
          nodejs
          nodePackages.create-react-app
          # myFlask
          curl
          jq
        ];
      };
    }
  );
}

