// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContentGuardian {
    struct Content {
        string title;
        string contentHash;
        string ipfsHash;
        string contentType;
        address owner;
        uint256 timestamp;
        bool exists;
    }

    mapping(string => Content) public contents;
    mapping(address => string[]) public userContents;
    address public owner;

    event ContentRegistered(
        string indexed contentHash,
        string title,
        string ipfsHash,
        string contentType,
        address owner
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function registerContent(
        string memory _contentHash,
        string memory _ipfsHash,
        string memory _title,
        string memory _contentType
    ) public {
        require(!contents[_contentHash].exists, "Content already registered");
        
        contents[_contentHash] = Content({
            title: _title,
            contentHash: _contentHash,
            ipfsHash: _ipfsHash,
            contentType: _contentType,
            owner: msg.sender,
            timestamp: block.timestamp,
            exists: true
        });

        userContents[msg.sender].push(_contentHash);
        
        emit ContentRegistered(
            _contentHash,
            _title,
            _ipfsHash,
            _contentType,
            msg.sender
        );
    }

    function getContent(string memory _contentHash) public view returns (
        string memory title,
        string memory ipfsHash,
        string memory contentType,
        address owner,
        uint256 timestamp
    ) {
        require(contents[_contentHash].exists, "Content not found");
        Content memory content = contents[_contentHash];
        return (
            content.title,
            content.ipfsHash,
            content.contentType,
            content.owner,
            content.timestamp
        );
    }

    function getUserContents(address _user) public view returns (string[] memory) {
        return userContents[_user];
    }
} 