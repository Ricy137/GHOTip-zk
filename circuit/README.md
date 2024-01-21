# Prerequisite 
please install circom and snarkjs according to: https://docs.circom.io/getting-started/installation/ .

# compile and setup
1. Delete all the files&folders under circuit folder apart from utils folder, deposit.circom and withdraw.circom

2. compile
   `circom deposit.circom --wasm`
   `circom withdraw.circom --r1cs --wasm`
   This will generate deposit_js, withdraw_js folders, which are required by frontend, and withdraw.r1cs file, which is required for G16 setup

3. setup with snarkjs, phase1
   For random text, you can use generate_big_number.js under utils folder.
   `snarkjs powersoftau new bn128 12 ceremony_0000.ptau`
   `snarkjs powersoftau contribute ceremony_0000.ptau ceremony_0001.patu`
   `snarkjs powersoftau contribute ceremony_0001.ptau ceremony_0002.patu`
   `snarkjs powersoftau contribute ceremony_0002.ptau ceremony_0003.patu`
4. prepare for phase2
   `snarkjs powersoftau prepare phase2 ceremony_0003.ptau ceremony_final.patu`

5. verify the integrity of the ceremony files
   `snarkjs powersoftau verify ceremony_final.ptau`
   
6. Groth16 setup
   `snarkjs groth16 setup withdraw.r1cs ceremony_final.ptau setup_0000.zkey`
   `snarkjs zkey contribute setup_0000.zkey setup_final.zkey`
   The setup_final.zkey file is required in frontend

8. Verify the integrity of the setup_final.zkey
   `snarkjs zkey verify withdraw.r1cs ceremony_final.ptau setup_final.zky`

9. Export Verifier.sol
    snarkjs zkey export solidityverifier setup_final.zkey Verifier.sol
   
